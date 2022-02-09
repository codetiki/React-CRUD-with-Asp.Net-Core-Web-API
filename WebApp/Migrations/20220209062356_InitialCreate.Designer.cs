﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebApp.Models;

namespace WebApp.Migrations
{
    [DbContext(typeof(BarDBContext))]
    [Migration("20220209062356_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.22")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("WebApp.Models.SauvaTyyppi", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Kuvaus")
                        .HasColumnType("nvarchar(500)");

                    b.Property<string>("Tyyppi")
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("Id");

                    b.ToTable("Sauvatyypit");
                });

            modelBuilder.Entity("WebApp.Models.Tulos", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("BarType")
                        .HasColumnType("nvarchar(500)");

                    b.Property<string>("DateOfJoining")
                        .HasColumnType("nvarchar(500)");

                    b.Property<string>("KuormaPK")
                        .HasColumnType("nvarchar(500)");

                    b.Property<string>("KuormaPM")
                        .HasColumnType("nvarchar(500)");

                    b.Property<string>("KuormaTV")
                        .HasColumnType("nvarchar(500)");

                    b.Property<string>("MaxM")
                        .HasColumnType("nvarchar(500)");

                    b.Property<string>("MaxV")
                        .HasColumnType("nvarchar(500)");

                    b.Property<string>("Nimi")
                        .HasColumnType("nvarchar(500)");

                    b.Property<string>("PhotoFileName")
                        .HasColumnType("nvarchar(500)");

                    b.Property<string>("PituusA")
                        .HasColumnType("nvarchar(500)");

                    b.Property<string>("PituusB")
                        .HasColumnType("nvarchar(500)");

                    b.Property<string>("PituusL")
                        .HasColumnType("nvarchar(500)");

                    b.HasKey("Id");

                    b.ToTable("Tulokset");
                });
#pragma warning restore 612, 618
        }
    }
}