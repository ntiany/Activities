using System;
using System.Collections.Generic;
using System.Text;
using Domain;

namespace Application.Profile
{
    public class Profile
    {
        public string DisplayName { get; set; }

        public string UserName { get; set; }

        public string Image { get; set; }

        public string Bio { get; set; }

        public ICollection<Photo> Photos { get; set; }
    }
}
