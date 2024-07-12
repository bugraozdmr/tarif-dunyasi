import React from "react";
import Avatar from "react-avatar";

// kullanılmıyor şu anlık
function InitialAvatar({ initials }) {
  return (
    <Avatar
      size="50" // Avatar boyutu
      round={true} // Yuvarlatılmış köşeler
      name={initials} // İsim baş harfleri
      textSizeRatio={2} // Metin boyutu oranı
    />
  );
}

export default InitialAvatar;
