using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using Application.Photos;
using Domain;

namespace API.Controllers
{
    public class PhotosController : BaseController
    {
        [HttpPost]
        public async Task<ActionResult<Photo>> Add([FromForm]Add.Command command)
        {
            return await Mediator.Send(command);
        }
    }
}
