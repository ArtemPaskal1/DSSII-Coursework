# Stage 1: Build the project
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Set working directory inside the container
WORKDIR /app

# Copy back-end folder into the container
COPY back-end/ ./back-end/

# Change directory to where the .csproj file is
WORKDIR /app/back-end

# Restore dependencies and publish the project in Release mode to /out
RUN dotnet restore
RUN dotnet publish back-end.csproj -c Release -o /out

# Stage 2: Run the project
FROM mcr.microsoft.com/dotnet/aspnet:8.0

# Set working directory inside the runtime container
WORKDIR /app

# Copy the published files from the build stage
COPY --from=build /app/back-end/out ./ 

# Expose port (если у тебя API слушает 5000, поменяй при необходимости)
EXPOSE 5000

# Command to run the application
ENTRYPOINT ["dotnet", "back-end.dll"]
