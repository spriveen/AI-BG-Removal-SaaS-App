import {Webhook, webhook} from 'svix'

//  API Controller Function to kanage clerk User With Database
// http://localhost:4000/user/webhooks
const clerkwebhooks = async (req, res) =>{

   try {

    // create a svix intsnace with clerk webhook secret
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

     await whook.verify(JSON.stringify(req.body),{
        "svix-id":req.headers["svix-id"],
        "svix-timestamp":req.headers["svix-timestamp"],
        "svix-signature" :req.headers["svix-signature"]
    })

    const {data,type} = req.body

    switch (type) {
        case "user.created":{

            const userData ={
               clerkId: data.id,
               email: data.email_addresses[0].email_address,
               firstName: data.first_Name,
               lastName: data.last_Name,
               photo: data.image_url

            }

            await userModel.create(userData)
            res.json({})

         break;

        }

         case "user.updated":{

         break;

        }

         case "user.deleted":{

         break;

        }
            
           
    
        default:
            break;
    }
    
   } catch (error) {
   console.log(error.message)
   res.json({sucess:false, message:error.message})
   
    
   }

}

