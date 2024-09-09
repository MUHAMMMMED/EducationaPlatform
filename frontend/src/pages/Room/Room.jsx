import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Config from '../../config';
// import { appID, serverSecret } from './config.js';

import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import AxiosInstance from '../../desing-system/Authentication/AxiosInstance';
import Loading from '../../desing-system/components/Loading';


export default function Room() {

  const appID = process.env.appID;
  const serverSecret = process.env.serverSecret;
  const { course_id, roomId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const meetingContainerRef = useRef(null);

  const fetchCourse = async () => {
    try {
      if (!course_id || !roomId) return;
      const response = await AxiosInstance.get(`${Config.baseURL}/meetings/meeting_Room/${course_id}/${roomId}/`);
      setData(response.data);
    } catch (error) {
      // Handle error
      console.error('Error fetching course:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [course_id, roomId]);

  useEffect(() => {
    if (!isLoading && meetingContainerRef.current && data) {
      const { id, user_full_name, maxUsers } = data;
      const userID = Math.floor(Math.random() * 10000 + id) + "";
      const userName = user_full_name + userID;

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId, userID, userName);

      const zp = ZegoUIKitPrebuilt.create(kitToken);

      if (zp) {
        zp.joinRoom({
          container: meetingContainerRef.current,

          scenario: {
            mode: ZegoUIKitPrebuilt.VideoConference,
            mode: ZegoUIKitPrebuilt.VideoConference,
          },
          turnOnMicrophoneWhenJoining: true,
          turnOnCameraWhenJoining: true,
          showMyCameraToggleButton: true,
          showMyMicrophoneToggleButton: true,
          showAudioVideoSettingsButton: true,
          showScreenSharingButton: true,
          showTextChat: true,
          showUserList: true,
          maxUsers: maxUsers,
          layout: 'Sidebar',
          showLayoutButton: true,
          screenSharingConfig: {
            resolution: ZegoUIKitPrebuilt.ScreenSharingResolution_Auto
          }


        });
      }
    }
  }, [isLoading, roomId, data]);

  if (isLoading) {
    return <Loading />;
  }

  if (!data || !data.active || !data.is_enrolled) {
    return <Loading />;
  }

  return (
    <div className='Container'>
      <div className="myCallContainer" ref={meetingContainerRef} style={{ width: '100vw', height: '90vh' }}></div></div>
  );
}
