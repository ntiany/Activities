using System;
using System.Collections.Generic;
using System.Text;
using Application.Interface;
using Microsoft.AspNetCore.Http;

namespace Application.Photos
{
    public class PhotoAccessor : IPhotoAccessor
    {
        public PhotoUploadResult AddPhoto(IFormFile file)
        {
            throw new NotImplementedException();
        }

        public string DeletePhoto(string photoId)
        {
            throw new NotImplementedException();
        }
    }
}
