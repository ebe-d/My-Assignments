import { pg } from "../index.js"

interface TravelPlan {
    id:number,
    user_id?:number,
    title:string,
    destination_city:string,
    destination_country:string,
    start_date:string,
    end_date:string,
    budget?:number
}

export const createTravelPlan=async(
    userId:number,
    plan:Omit<TravelPlan,'id'>
):Promise<TravelPlan>=>{
    const result=await pg.query(`INSERT INTO travel (user_id,title,destination_city,destination_country,start_date,end_date,budget) 
        VALUES ($1,$2,$3,$4,$5,$6,$7) 
        RETURNING id,user_id,title,destination_city,destination_country,start_date,end_date,budget`,[userId,plan.title,plan.destination_city,plan.destination_country,plan.start_date,plan.end_date,plan.budget]);
    return result.rows[0].id;
};

export const updateTravelPlan=async(
    PlanId:number,
    field:keyof Omit<TravelPlan,'id'>,
    value:any
):Promise<TravelPlan>=>{

    const result=await pg.query(`UPDATE travel SET ${field}=$1 WHERE id=$2
         RETURNING * ;`,[value,PlanId])
    
    return result.rows[0];
}

export const getTravelPlans=async(
    PlanId:number
):Promise<TravelPlan[]>=>{

    const result=await pg.query('SELECT * FROM travel WHERE id=$1;',[PlanId]);
    return result.rows;

}