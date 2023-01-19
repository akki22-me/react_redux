
 import {Add_user,User_login,ssc_add,sscdetail,hscadd,graduation_add,postgradd,contactdetail,addskill}  from '../action/actiontype';
const intialvalues={
    useraddmsg:null,
    useraddstatus:null,
    loginstatus:null,
    loginmsg:null,
    token:null,
    dbid:null,
    sscaddstatus:'',
    sscaddmsg:'',
    sscdata:null,
    hscstatus:null,
    hscmsg:null,
    graduationmsg:null,
    graduationstatus:null,
    poststatus:null,
    postmsg:null,
    constmsg:null,
    conststatus:null,
    skillmsg:null,
    skillstatus:null
}


const userreducer=(state=intialvalues,action)=>{
switch(action.type){
    case Add_user:return{
       ...state,
       useraddmsg:action.useraddmsg,
       useraddstatus:action.useraddstatus
    }
    case User_login:return{
        ...state,
        loginstatus:action.loginstatus,
        loginmsg:action.loginmsg,
        token:action.token,
        dbid:action.dbid,
    }
    case  ssc_add:return{
        ...state,
        sscaddstatus:action.sscaddstatus,
        sscaddmsg:action.sscaddmsg,
    }
    case sscdetail: return{
        ...state,
        sscdata:action.sscdata
    }
    case hscadd : return {
        ...state,
        hscmsg:action.hscmsg,
        hscstatus:action.hscstatus
    }
    case graduation_add:return{
        ...state,
        graduationmsg:action.graduationmsg,
    graduationstatus:action.graduationstatus
    }
    case postgradd:return{
        ...state,
        postmsg:action.postmsg,
        poststatus:action.poststatus
    }
    case contactdetail:return{
        ...state,
        constmsg:action.constmsg,
        conststatus:action.conststatus
    }
    case addskill : return{
        ...state,
        skillmsg:action.skillmsg,
        skillstatus:action.skillstatus
    }
    default:return state

}
}

export default userreducer;