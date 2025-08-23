import { Client, Databases, ID, Query } from "appwrite"


const PROJRCT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID

/*first*/
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PROJRCT_ID)

const databases = new Databases(client);

export const updtaeSearchCount = async (searchterm, movie) => {
    // 1.USE appwrite sdk to check if the search term exixts in the database
    try {
        const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [Query.equal('searchterm', searchterm),]
        )
        // 2.if it does , update the count
        if (result.documents.length > 0) {
            const doc = result.documents[0];

            await databases.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
                count: doc.count + 1,
            })
        } else {
            //3. if it doesn't ,create a new documentwith the search term and count as 
            await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchterm,
                count: 1,
                movie_id: movie.id,
                poster_url: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
            })
        }

    } catch (error) {
        
        console.error("Error updating search count:", error);
    }

    

}

export const getTrendingMovie = async () => {
    try {
        const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(5),
            Query.orderDesc("count"),
        
        ])
        return result.documents;
    } catch (error) {
        console.log(error);
        return [];
    }
}
console.log(getTrendingMovie())