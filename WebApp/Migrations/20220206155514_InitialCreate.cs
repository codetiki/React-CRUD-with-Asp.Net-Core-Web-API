﻿using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApp.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Sauvatyypit",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    tyyppi = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    kuvaus = table.Column<string>(type: "nvarchar(500)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sauvatyypit", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Tulokset",
                columns: table => new
                {
                    ResultId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nimi = table.Column<string>(type: "nvarchar(500)", nullable: true),
                    PituusL = table.Column<string>(type: "nvarchar(500)", nullable: true),
                    PituusA = table.Column<string>(type: "nvarchar(500)", nullable: true),
                    PituusB = table.Column<string>(type: "nvarchar(500)", nullable: true),
                    KuormaTV = table.Column<string>(type: "nvarchar(500)", nullable: true),
                    KuormaPK = table.Column<string>(type: "nvarchar(500)", nullable: true),
                    KuormaPM = table.Column<string>(type: "nvarchar(500)", nullable: true),
                    BarType = table.Column<string>(type: "nvarchar(500)", nullable: true),
                    MaxM = table.Column<string>(type: "nvarchar(500)", nullable: true),
                    MaxV = table.Column<string>(type: "nvarchar(500)", nullable: true),
                    DateOfJoining = table.Column<string>(type: "nvarchar(500)", nullable: true),
                    PhotoFileName = table.Column<string>(type: "nvarchar(500)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tulokset", x => x.ResultId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Sauvatyypit");

            migrationBuilder.DropTable(
                name: "Tulokset");
        }
    }
}
