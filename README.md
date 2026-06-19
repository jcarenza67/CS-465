# Travlr Getaways Full Stack Project

## Architecture

**Compare/contrast frontend types used (Express HTML, JavaScript, SPA)**

The customer-facing side uses Express with Handlebars templates. The server pulls data, builds the HTML server-side, and sends a finished page to the browser. Every interaction that changes the view means a new request to the server. The admin side is a completely different approach: an Angular SPA that loads once and then handles everything client-side with TypeScript and components. After the initial load, the SPA only talks to the API for data, not for re-rendering the whole page. The Express side is simpler and faster to build for content that doesn't need much interactivity. The SPA is more complex but gives a much better experience for an admin doing repeated CRUD operations.

**Why NoSQL MongoDB?**

MongoDB fits the trip data well because the schema doesn't need rigid relational structure, and it's a natural fit with the rest of the MEAN stack since everything from the database to the frontend uses JavaScript or JSON. Mongoose adds schema validation on top, so we get some of the structure benefits of a relational database without losing the flexibility of a document store.

## Functionality

**JSON vs JavaScript, and how JSON ties frontend/backend together**

JavaScript is the programming language. JSON is just a data format, a simple text structure for representing objects that happens to look like JavaScript object syntax but isn't actual code. It's the format the Express API uses to send trip data to the Angular app, and the format Angular sends back when adding or updating a trip. Since both ends of the stack are JavaScript-based, JSON moves between them without any conversion step, which is a big part of why the MEAN stack works so smoothly together.

**Refactoring for functionality/efficiency, benefits of reusable UI components**

One clear example was building the JwtInterceptor instead of manually adding the Authorization header to every individual API call in trip-data.service. Centralizing it in one interceptor means any future API call automatically gets the token without extra code. Another was the trip-card component, which gets reused for every trip in the listing instead of duplicating the card markup. If I need to change how a trip displays, I only need to update one file and every card updates automatically. Reusable components like this cut down on duplicated code and reduce the number of places a bug can hide.

## Testing

**Methods, endpoints, and security testing in a full stack application**

Testing a full stack app means checking each HTTP method does what it should at each endpoint: GET retrieves without changing anything, POST creates, PUT updates, DELETE removes. Once security gets added, testing gets more layered. It's not enough to check that an endpoint works, you also have to check that it correctly rejects requests without valid credentials. I tested this by hitting protected endpoints in Postman with no token (expecting a 401), with a valid token (expecting success), and with a deliberately corrupted token (expecting another 401). That last test matters because it confirms the server is actually validating the token's signature, not just checking that something resembling a token is present.

## Reflection

**How this course helped reach professional goals, skills learned/developed/mastered**

This course gave me hands-on experience building a complete full stack application from scratch, which is something I hadn't done end-to-end before. Going from a static customer-facing site to a database-backed Express API to a full Angular SPA with authentication gave me a much better sense of how all the pieces of a real web application fit together. That's directly useful for my goal of moving into a hybrid field-ops/software role at HCC, since being able to build internal tools instead of just using off-the-shelf platforms makes me a lot more valuable there. The security module specifically helped me understand authentication patterns I'll need for any internal tooling that touches sensitive data going forward.
