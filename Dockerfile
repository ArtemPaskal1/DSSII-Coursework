# Stage 1: Build the application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Set working directory inside the container
WORKDIR /src

# Copy the back-end project into the container
COPY back-end/back-end ./back-end

# Go to the back-end folder where the .csproj is
WORKDIR /src/back-end

# Restore dependencies
RUN dotnet restore

# Publish the project in Release mode to /app/out
RUN dotnet publish -c Release -o /app/out

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0

# Set working directory inside the runtime container
WORKDIR /app

# Copy the published files from the build stage
COPY --from=build /app/out .

# Command to run the application
ENTRYPOINT ["dotnet", "back-end.dll"]
