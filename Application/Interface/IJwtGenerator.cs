using System;
using System.Collections.Generic;
using System.Text;
using Domain;

namespace Application.Interface
{
    public interface IJwtGenerator
    {
        string CreateToken(AppUser user);
    }
}
