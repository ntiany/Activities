﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interface;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class ProfileReader : IProfileReader
    {
        private readonly DataContext _context;

        private readonly IUserAccessor _userAccessor;

        public ProfileReader(DataContext context, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
        }

        public async Task<Profile> ReadProfile(string username)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == username);

            if (user == null)
            {
                throw new RestException(HttpStatusCode.NotFound, new {user = "Not found"});
            }

            var currentUser =
                await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

            var profile = new Profile
            {
                DisplayName = user.DisplayName,
                Bio = user.Bio,
                Image = user.Photos.FirstOrDefault(x => x.IsMain)?.Url,
                Photos = user.Photos,
                UserName = user.UserName,
                FollowersCount = user.Followers.Count,
                FollowingsCount = user.Followings.Count
            };

            if (currentUser.Followings.Any(x => x.TargetId == user.Id))
            {
                profile.IsFollowed = true;
            }

            return profile;
        }
    }
}
