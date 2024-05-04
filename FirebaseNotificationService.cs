using FirebaseAdmin;
using FirebaseAdmin.Messaging;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Hosting;
using System;
using System.IO;
using System.Threading.Tasks;

public class FirebaseNotificationService : IDisposable
{
    private FirebaseApp _firebaseApp;
    private bool _disposed = false;
    string jsonPath;

    public FirebaseNotificationService(IWebHostEnvironment env)
    {
         jsonPath = Path.Combine(env.WebRootPath, "notification.json");

        // Check if a Firebase app instance already exists
        if (FirebaseApp.DefaultInstance == null)
        {
            _firebaseApp = FirebaseApp.Create(new AppOptions
            {
                Credential = GoogleCredential.FromFile(jsonPath)
            });
        }
        else
        {
            _firebaseApp = FirebaseApp.DefaultInstance;
        }
    }

 
    public async Task SendNotificationAsync(string title, string body, string[] deviceTokens)
    {
        var message = new MulticastMessage
        {
            Notification = new Notification
            {
                Title = title,
                Body = body
            },
            Tokens = deviceTokens
        };

        try
        {
            var response = await FirebaseMessaging.DefaultInstance.SendMulticastAsync(message);
            Console.WriteLine($"{response.SuccessCount} messages were sent successfully.");
        }
        catch (Exception e)
        {
            Console.WriteLine($"Failed to send notification: {e.Message}");
        }
    }

    protected virtual void Dispose(bool disposing)
    {
        if (!_disposed)
        {
            if (disposing)
            {
                // Dispose of Firebase resources
                _firebaseApp?.Delete();
            }
            _disposed = true;
        }
    }

    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }
}
