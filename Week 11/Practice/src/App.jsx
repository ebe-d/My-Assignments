import {RecoilRoot, useRecoilState, useRecoilValue} from 'recoil';

import {jobsAtom, messagingAtom, networkAtom, notificationAtom, TotalSelector} from './store/atoms/count';



function App(){

    return <RecoilRoot>
        <MainApp/>
    </RecoilRoot>
}

function MainApp(){

    const NetworkNotificationCount=useRecoilValue(networkAtom);
    const JobNotificationCount=useRecoilValue(jobsAtom);
    const NotificationCount=useRecoilValue(notificationAtom);
    const messagingAtomCount=useRecoilValue(messagingAtom);
    const totalNotification=useRecoilValue(TotalSelector);
    return <div>
    <button>Home</button>
    <button>My network ({NetworkNotificationCount>=100?'99+':NetworkNotificationCount})</button>
    <button>Messaging ({messagingAtomCount})</button>
    <button>Jobs ({JobNotificationCount})</button>
    <button>Notifications ({NotificationCount})</button>
    <button>Me {totalNotification}</button>
    </div>
}

export default App;