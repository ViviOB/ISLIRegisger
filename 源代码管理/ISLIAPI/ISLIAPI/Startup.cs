﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ISLI.Unility;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using ISLI.IService;
using ISLI.Service;
using SqlSugar;

namespace ISLIAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //依赖注入
            services.AddTransient<IJurisdiction, JurisdictionService>();
            services.AddTransient<IPublishApply, PublishApplyService>();
            var connstr = "Data Source=169.254.35.148;dataBase=isli_database;user id=root;pwd=19950503";
            BaseDB.DBConnectionString = connstr;//初始化数据库连接字符串
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddTransient<IBooks, BooksService>();//注入
            services.AddTransient<IAuthorization, AuthorizationService>();//注入
            services.AddTransient<IFacilitator, FacilitatorService>();//注入
            services.AddTransient<IUserInformation, UserInformationService>();//注入
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
