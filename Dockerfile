# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /app

# Copy the contents of back-end folder into /app
COPY back-end/ ./

# Restore and publish
RUN dotnet restore
RUN dotnet publish back-end.csproj -c Release -o /out

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0

WORKDIR /app

COPY --from=build /out ./

ENTRYPOINT ["dotnet", "back-end.dll"]
