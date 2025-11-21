Express-rate-limit for Basic Rate Limiting:
Express-rate-limit can help prevent brute-force or DoS attacks by stopping clients from sending too many requests to the server.

The default status code is 429 Too Many Requests. 
To use it, you need to install it with npm install express-rate-limit.

You can implement it using windowsMs, max, and message. 
WindowsMs allows you to define the time in milliseconds that the limit applies to. 
Max allows you to define the maximum number of requests that can be sent from an IP address in the windowsMs time period. 
Message lets you customize the error message that is returned when clients exceed the limit.