using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Profile;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfileController : BaseController
    {
        [HttpGet("{username}")]
        public async Task<ActionResult<Profile>> Get(string username)
        {
            return await Mediator.Send(new Details.Query {Username = username});
        }
    }
}
