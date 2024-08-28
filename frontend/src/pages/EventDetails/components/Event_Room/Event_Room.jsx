import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Config from '../../../../config';
import Loading from '../../../../desing-system/components/Loading';
import { appID, serverSecret } from './config.js';
axios.defaults.withCredentials = true;
export default function EventRoom() {
  const { id: roomId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const meetingContainerRef = useRef(null);
 
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        if (!roomId) return;             
        const response = await axios.get(`${Config.baseURL}/Event/event_room/${roomId}/`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching event:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [roomId]);

  useEffect(() => {
    if (!isLoading && meetingContainerRef.current && data && data.active) {
      const userID = Math.floor(Math.random() * 10000) + "";
      const userName =  'Name';

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId, userID, userName);
      const zp = ZegoUIKitPrebuilt.create(kitToken);

      if (zp) {
        zp.joinRoom({
          container: meetingContainerRef.current,
          scenario: {
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
          layout: 'Sidebar',
          showLayoutButton: true,
          screenSharingConfig: {
            resolution:ZegoUIKitPrebuilt.ScreenSharingResolution_Auto
          }
        });
      }
    }
  }, [isLoading, roomId, data]);

  if (isLoading || !data || !data.active) {
    return <Loading />;
  }
 
  return (
    <div className="myCallContainer" ref={meetingContainerRef} style={{ width: '100vw', height: '90vh' }}></div>
  );
}
