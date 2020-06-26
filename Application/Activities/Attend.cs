﻿
using System;
using System.Net;
using System.Security.Cryptography.X509Certificates;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interface;
using Application.User;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class Attend
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }

            public class Handler : IRequestHandler<Command>
            {
                private readonly DataContext _context;

                private readonly IUserAccessor _userAccessor;

                public Handler(DataContext context, IUserAccessor userAccessor)
                {
                    _context = context;
                    _userAccessor = userAccessor;
                }

                public async Task<Unit> Handle(Command request, CancellationToken token)
                {
                    var activity = await _context.Activities.FindAsync(request.Id);

                    if (activity == null)
                    {
                        throw new RestException(HttpStatusCode.NotFound, 
                            new {Activity = "Could not find activity"});
                    }

                    var user = await _context.Users.SingleOrDefaultAsync(
                        x => x.UserName == _userAccessor.GetCurrentUsername());

                    var attendence = await _context.UserActivity.SingleOrDefaultAsync(
                        x => x.ActivityId == activity.Id && x.AppUserId == user.Id);

                    if (attendence != null)
                    {
                        throw new RestException(HttpStatusCode.BadRequest,
                            new { Attendence = "Already attenting this activity" });
                    }

                    attendence = new UserActivity
                    {
                        Activity = activity,
                        AppUser = user,
                        IsHost = false,
                        DateJoined = DateTime.Now
                    };

                    _context.UserActivity.Add(attendence);

                    var success = await _context.SaveChangesAsync(token) > 0;

                    if (success) return Unit.Value;

                    throw new Exception("Problem saving changes");
                }
            }
        }
    }
}
