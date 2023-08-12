const Store = require("../../../../models/store");
const status = require("../../../../enums/status");
const storeType = require("../../../../enums/storeType");

// Function to create a new Store
// Function to create a new Store
async function createStore(storeData) {
  try {
    const { catalogue, ...storeWithoutCatalogue } = storeData;

    // Create a new store without the catalogue field
    const newStore = new Store(storeWithoutCatalogue);

    // Add the items' details directly to the store's catalogue array
    if (catalogue && Array.isArray(catalogue)) {
      newStore.catalogue = catalogue; // Assign the catalogue directly
    }

    // Save the store to the database
    const createdStore = await newStore.save();

    return createdStore;
  } catch (error) {
    throw error;
  }
}


// Function to find a user by their username
async function findStoreByName(name) {
  try {
    const store = await Store.findOne({ name: name });
    return store;
  } catch (error) {
    throw error;
  }
}

async function listAllStores() {
  try {
    const stores = await Store.find({
      status: { $ne: status.DELETE },
    });
    return stores;
  } catch (error) {
    // Handle the error and provide a meaningful error message
    console.error("Error while fetching all stores:", error);
    throw new Error("Failed to fetch all stores. Please try again later.");
  }
}

async function emailStoreNameExist(email, name) {
  try {
    const query = {
      $and: [
        { status: { $ne: status.DELETE } },
        {
          $or: [{ email: email }, { name: name }],
        },
      ],
    };

    const existingStore = await Store.findOne(query);
    return existingStore; // Return the found store
  } catch (error) {
    // Handle the error gracefully (e.g., log or throw a custom error)
    console.error("Error in emailOrStoreNameExists:", error);
    throw new Error("An error occurred while checking store existence.");
  }
}


// Function to update a user by their ID
async function updateStoreById(userId, updateData) {
  try {
    const updatedStore = await Store.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
    return updatedStore;
  } catch (error) {
    throw error;
  }
}

async function updateStoreCatalogueById(userId, updateData) {
  try {
    // Check if the updateData includes an array of items to add to the catalog
    if (updateData.catalogue && Array.isArray(updateData.catalogue)) {
      // If so, we'll use $push to add each item to the catalogue array
      await Promise.all(
        updateData.catalogue.map(async (item) => {
          const newItem = new Item(item); // Create a new item based on the item schema
          await newItem.save(); // Save the new item to the database
          updateData.catalogue = updateData.catalogue.map((item) => item._id); // Replace item objects with their IDs
          updateData.catalogue.push(newItem._id); // Push the new item's ID to the updateData
        })
      );
    }

    const updatedStore = await Store.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    return updatedStore;
  } catch (error) {
    throw error;
  }
}

// Function to delete a user by their ID
async function deleteStoreById(userId) {
  try {
    const deletedStore = await Store.findByIdAndDelete(userId);
    return deletedStore;
  } catch (error) {
    throw error;
  }
}

async function findStore(query) {
  try {
    // Assuming you have a database connection and a Store model or collection

    // Replace 'Store' with your actual Store model or collection name
    const store = await Store.findOne(query);

    // Return the found user object or null if not found
    return store;
  } catch (error) {
    // Handle any errors that occurred during the database operation
    console.error("Error finding store:", error);
    throw error;
  }
}

module.exports = {
  createStore,
  findStoreByName,
  updateStoreById,
  deleteStoreById,
  findStore,
  emailStoreNameExist,
  listAllStores,
  updateStoreCatalogueById,
};
