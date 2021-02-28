if (process.env.NODE_ENV === "production") {
  module.exports = {
    mongoURI:
      "mongodb+srv://AkartAdmin:vefa1234@akart.xlq4h.mongodb.net/Akart?retryWrites=true&w=majority"
  };
} else {
  module.exports = { mongoURI: "mongodb+srv://AkartAdmin:vefa1234@akart.xlq4h.mongodb.net/Akart?retryWrites=true&w=majority" };
}

