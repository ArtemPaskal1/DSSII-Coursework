# Use the official .NET SDK image for building
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Set working directory inside the container
WORKDIR /app

# Copy all back-end project files into the container
COPY back-end/ ./

# Publish the project in Release configuration to the /out folder
RUN dotnet publish back-end.csproj -c Release -o /out

# Use the lightweight ASP.NET runtime image for running the app
FROM mcr.microsoft.com/dotnet/aspnet:8.0

# Set working directory inside the runtime container
WORKDIR /app

# Copy the published files from the build stage
COPY --from=build /out ./

# Command to run the application
ENTRYPOINT ["dotnet", "back-end.dll"]
