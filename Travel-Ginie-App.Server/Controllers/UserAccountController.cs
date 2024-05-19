using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using RestSharp;
using RestSharp.Authenticators;
using System;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Travel_Ginie_App.Server.Models;

namespace Travel_Ginie_App.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserAccountController : ControllerBase
    {
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;
        private readonly ILogger<UserAccountController> _logger;
        private readonly IConfiguration _configuration;

        public UserAccountController(SignInManager<User> signInManager, UserManager<User> userManager, ILogger<UserAccountController> logger, IConfiguration configuration)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _logger = logger;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<ActionResult> RegisterUser(User user)
        {
            try
            {
                User newUser = new User()
                {
                    Name = user.Name,
                    Email = user.Email,
                    UserName = user.UserName,
                    EmailConfirmed = false
                };

                IdentityResult result = await _userManager.CreateAsync(newUser, user.PasswordHash);

                if (result.Succeeded)
                {
                    var token = await _userManager.GenerateEmailConfirmationTokenAsync(newUser);
                    var emailBody = $"Please confirm your email address <a href=\"#URL#\">Click Here </a>";
                    var callbackUrl = $"{Request.Scheme}://{Request.Host}{Url.Action("ConfirmEmail", "UserAccount", new { userId = newUser.Id, token })}";
                    var body = emailBody.Replace("#URL#", System.Text.Encodings.Web.HtmlEncoder.Default.Encode(callbackUrl));

                    bool emailSent = SendEmail(body, newUser.Email);
                    if (!emailSent)
                    {
                        _logger.LogError("Failed to send confirmation email to user.");
                        return StatusCode(StatusCodes.Status500InternalServerError, "Failed to send confirmation email.");
                    }
                }
                else
                {
                    return BadRequest(result);
                }

                return Ok(new { message = "Registered Successfully." });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error occurred during user registration: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong, please try again.");
            }
        }

        [HttpGet]
        [Route("confirmEmail")]
        public async Task<IActionResult> ConfirmEmail(string userId, string token)
        {
            if (userId == null || token == null)
            {
                return BadRequest(new { message = "No email or URL found." });
            }

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound("Invalid parameters.");
            }

            token = Encoding.UTF8.GetString(Convert.FromBase64String(token));

            var result = await _userManager.ConfirmEmailAsync(user, token);
            var status = result.Succeeded ? "Thank you for confirming your email." : "Your email is not confirmed. Please try again.";
            return Ok(status);
        }

        [HttpPost("login")]
        public async Task<ActionResult> LoginUser(Login login)
        {
            try
            {
                User user_ = await _userManager.FindByEmailAsync(login.Email);
                if (user_ != null)
                {
                    login.UserName = user_.UserName;

                    if (!user_.EmailConfirmed)
                    {
                        user_.EmailConfirmed = true;
                    }

                    var result = await _signInManager.PasswordSignInAsync(user_, login.Password, login.Remember, false);

                    if (!result.Succeeded)
                    {
                        return Unauthorized(new { message = "Check your login credentials and try again" });
                    }

                    user_.LastLogin = DateTime.Now;
                    var updateResult = await _userManager.UpdateAsync(user_);
                }
                else
                {
                    return BadRequest(new { message = "Please check your credentials and try again. " });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Something went wrong, please try again. " + ex.Message });
            }

            return Ok(new { message = "Login Successful." });
        }

        [HttpGet("logout"), Authorize]
        public async Task<ActionResult> LogoutUser()
        {
            try
            {
                await _signInManager.SignOutAsync();
                return Ok(new { message = "Logged out successfully." });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error occurred during logout: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong, please try again.");
            }
        }

        [HttpGet("admin"), Authorize]
        public ActionResult AdminPage()
        {
            string[] partners = { "Tensae", "Edris", "Sami", "Robin", "Andreas" };
            return Ok(new { trustedPartners = partners });
        }

        [HttpGet("home/{email}"), Authorize]
        public async Task<ActionResult> HomePage(string email)
        {
            User userInfo = await _userManager.FindByEmailAsync(email);
            if (userInfo == null)
            {
                return BadRequest(new { message = "Something went wrong, please try again." });
            }

            return Ok(new { userInfo = userInfo });
        }

        [HttpGet("xhtlekd")]
        public async Task<ActionResult> CheckUser()
        {
            User currentUser = new();

            try
            {
                var user_ = HttpContext.User;
                var principals = new ClaimsPrincipal(user_);
                var result = _signInManager.IsSignedIn(principals);
                if (result)
                {
                    currentUser = await _signInManager.UserManager.GetUserAsync(principals);
                }
                else
                {
                    return Forbid();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error occurred while checking user: {ex.Message}");
                return BadRequest(new { message = "Something went wrong please try again. " + ex.Message });
            }

            return Ok(new { message = "Logged in", user = currentUser });
        }

        private bool SendEmail(string body, string email)
        {
            try
            {
                var client = new RestClient("https://api.mailgun.net/v3");
                var request = new RestRequest("{domain}/messages", Method.Post);
                var options = new RestClientOptions();
                options.Authenticator = new HttpBasicAuthenticator("api", _configuration.GetSection("EmailConfig:API_KEY").Value);
                request.AddParameter("domain", "sandbox400a2c1c2bf544e293259e763071028d.mailgun.org");
                request.AddParameter("from", "tensae-girma.seifu@chasacademy.se");
                request.AddParameter("to", email);
                request.AddParameter("subject", "Email Confirmation");
                request.AddParameter("text", body);

                var response = client.Execute(request);
                return response.IsSuccessful;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error occurred while sending email: {ex.Message}");
                return false;
            }
        }
    }
}
