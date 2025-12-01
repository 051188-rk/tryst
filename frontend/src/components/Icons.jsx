import React from 'react';
import {
  IoHeart,
  IoHeartOutline,
  IoThumbsUp,
  IoThumbsUpOutline,
  IoPeople,
  IoPeopleOutline,
  IoChatbubbles,
  IoChatbubblesOutline,
  IoPerson,
  IoPersonOutline,
  IoClose,
  IoSend,
  IoCamera,
  IoLogOut,
  IoSettings,
  IoArrowBack,
  IoCheckmark,
  IoCloseCircle
} from 'react-icons/io5';

export const HeartIcon = ({ active = false, size = 24 }) => (
  active ? <IoHeart size={size} /> : <IoHeartOutline size={size} />
);

export const LikeIcon = ({ active = false, size = 24 }) => (
  active ? <IoThumbsUp size={size} /> : <IoThumbsUpOutline size={size} />
);

export const MatchesIcon = ({ active = false, size = 24 }) => (
  active ? <IoPeople size={size} /> : <IoPeopleOutline size={size} />
);

export const ChatIcon = ({ active = false, size = 24 }) => (
  active ? <IoChatbubbles size={size} /> : <IoChatbubblesOutline size={size} />
);

export const ProfileIcon = ({ active = false, size = 24 }) => (
  active ? <IoPerson size={size} /> : <IoPersonOutline size={size} />
);

export const CloseIcon = ({ size = 24 }) => <IoClose size={size} />;

export const HeartFilledIcon = ({ size = 24 }) => <IoHeart size={size} color="var(--primary)" />;

export const SendIcon = ({ size = 24 }) => <IoSend size={size} />;

export const CameraIcon = ({ size = 24 }) => <IoCamera size={size} />;

export const LogOutIcon = ({ size = 24 }) => <IoLogOut size={size} />;

export const SettingsIcon = ({ size = 24 }) => <IoSettings size={size} />;

export const ArrowBackIcon = ({ size = 24 }) => <IoArrowBack size={size} />;

export const CheckmarkIcon = ({ size = 24 }) => <IoCheckmark size={size} />;

export const CloseCircleIcon = ({ size = 24 }) => <IoCloseCircle size={size} />;
