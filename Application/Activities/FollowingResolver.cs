﻿using System.Linq;
using Application.Interface;
using AutoMapper;

using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class FollowingResolver : IValueResolver<UserActivity, AttendeeDto, bool>
    {
        private readonly DataContext _dataContext;

        private readonly IUserAccessor _userAccessor;

        public FollowingResolver(DataContext dataContext, IUserAccessor userAccessor)
        {
            _dataContext = dataContext;
            _userAccessor = userAccessor;
        }

        public bool Resolve(UserActivity source, AttendeeDto destination, bool destMember, ResolutionContext context)
        {
            var username = _userAccessor.GetCurrentUsername();

            var currentUser =
                _dataContext.Users.SingleOrDefaultAsync(x => x.UserName == username).Result;

            if (currentUser.Followings.Any(x => x.TargetId == source.AppUserId))
                return true;

            return false;
        }
    }
}
