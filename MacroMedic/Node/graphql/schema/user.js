const UserSchema = `

    type Location {
        latitude: String
        longitude: String
    }

    input LocationInput {
        latitude: String
        longitude: String
    }

    type Review {
        comment: String
        rating: Float
        patient: ID
        date: String
    }

    input ReviewInput {
        comment: String
        rating: Float
        patient: ID
        date: String
    }

    type User {
        _id: ID!
        name: String
        phoneNo: String
        email: String!
        password: String
        role: String!
        age: Int
        sex: String
        specialization: String
        averageRating: Float!
        reviews: [Review!]
        token: String
        about: String
        location: Location
        image: String
        charge: Int
    }

    input UserInput {
        _id: ID
        name: String!
        phoneNo: String
        email: String!
        password: String!
        role: String!
        age: Int
        sex: String
        specialization: String
        about: String
        location: LocationInput
        charge: Int
    }
    
    input UpdateUserInput {
        _id: ID!
        name: String
        phoneNo: String
        email: String
        password: String
        role: String
        age: Int
        sex: String
        specialization: String
        about: String
        location: LocationInput
        charge: Int
    }
`;

module.exports = {UserSchema};