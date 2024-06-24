// ~ The main file to handle routes of the main page ~

// Importing Express.Js to handle routes
const express = require('express');
const postModel = require('../models/postModel');

// Saving the Router function in constant to be used later in handling routes
const app = express.Router();


// ~ The Main Routes ~

// Handing the GET Request when trying to access the Home page
app.get('', async (request, response) => {
  try {
    const locals = {
      title: "NodeJs Blog",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    }

    let perPage = 10;
    let page = request.query.page || 1;

    const data = await Post.aggregate([ { $sort: { createdAt: -1 } } ])
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec();

    // Count is deprecated - please use countDocuments
    // const count = await Post.count();
    const count = await Post.countDocuments({});
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    response.render('index', {
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      currentRoute: '/'
    });

  } catch (error) {
    console.log(error);
  }

});
// Handing the GET Request when trying to access the About page
app.get('/about', (request, response) => {
    response.render('about', { title: 'About' });
});

// Handing the GET Request when trying to access the Contact US page
app.get('/contactUs', (request, response) => {
    response.render('contactUs', { title: 'Contact Us' });
});

// Handing the GET Request when trying to access some unknown page
app.use((request, response) => {
    response.status(404).render('404', { title: '404' });
  });

// function insertPostData () {
//     postModel.insertMany([
//     {
//       title: "Microsoft’s new Outlook security changes impact third-party apps and Gmail integration",
//       body: "Microsoft is announcing some changes to Outlook for consumers that will further safeguard accounts. The software maker plans to end support for Basic Authentication for Outlook personal accounts starting on September 16th, it’s removing the light version of the Outlook web application on August 19th, and it will no longer support Gmail accounts in Outlook.com on June 30th. All of these changes are part of Microsoft’s Secure Future Initiative overhaul of its security practices."
//     },
//     {
//       title: "Google Lays Off Flutter and Dart Teams Following Python Team Cuts",
//       body: "Google had a big meeting planned. But before the meeting, Google let go of some important tech teams. \n Last week, many people talked about Google firing the main Python team.\n Thomas Wouters works on the Google Python team. He wrote a post that surprised people. He said it was a hard day when Google let go of all the people he works with closely, even his boss. Google asked him to find new people for their jobs in other countries. But the new people were not pleased about this."
//     },
//     {
//       title: "Stop Using UUIDs in Your Database",
//       body: "One of the most common way to uniquely identify rows in a database is by using UUID fields.This approach, however, comes with performance caveats that you must be aware of. In this article, we discuss two performance issues that may arise when using UUIDs as keys in your database tables. So without further ado… Let’s jump right in!"
//     },
//     ])
// }

// insertPostData();


// Exporting the router handler to be accessed from outside
module.exports = app;
