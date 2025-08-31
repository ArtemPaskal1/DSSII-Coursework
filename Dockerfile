# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /app

# Copy the back-end folder into the container
COPY back-end/ ./back-end/

# Go to the back-end folder
WORKDIR /app/back-end

# Restore dependencies and publish the project to /out
RUN dotnet restore
RUN dotnet publish back-end.csproj -c Release -o /out

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0

WORKDIR /app

# Copy published files from build stage
COPY --from=build /out ./

# Command to run the app
ENTRYPOINT ["dotnet", "back-end.dll"]
