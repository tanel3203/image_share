Images = new Mongo.Collection("images");

// set up security on Images collection
Images.allow({

	insert:function(userId, doc) {
		console.log("testing security on image insert");
		if (Meteor.user()) { // theyare logged in
			console.log(doc); // log to server what is being inserted
			
			doc.createdBy  = userId; // force the image to be owned by the user
			if (userId != doc.createdBy) {
				return false;
			}
			else { // user is logged in, image has correct userId
				return true;
			}
		}
		else { // user not logged in
			return false;
		}
	},
	remove:function(userId, doc) {
		return true;
	}

})
