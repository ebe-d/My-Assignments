import { atom,selector } from "recoil";


export const notifications=atom({
    key:'notifications',
    default:selector({
        key:'notiticationSelector',
        get:async()=>{
            const res=axios.get('djsfjlsljsf.com') 
            return res.data
        }
    })
})


export const totalSelector=selector({
    key:'allselectors',
    get:({get})=>{
        const Allnoti=get(notifications);
        return Allnoti.yada+Allnoti.pada
    }
})