import { useEffect, useState } from "react";

const useDragAndDrop = () => {
  const [hovering, setHovering] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [emtpyImageBoxText, setEmptyImageBoxText] = useState(
    "Drag and drop an image URL"
  );

  // switch between drag-and-drop and copy-paste if mobile or desktopF
  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  };

  // show hovering animation when hovering over with an element
  const handleDragOver = (e) => {
    e.preventDefault();
    setHovering(true);
  };

  // hide hovering animation when leaving with an element
  const handleDragLeave = (e) => {
    // Check if the drag event is leaving the drop area itself, not its children
    if (
      !e.relatedTarget ||
      e.relatedTarget === document ||
      !e.currentTarget.contains(e.relatedTarget)
    ) {
      setHovering(false);
    }
  };

  // check if dropped item is valid
  const checkDroppedItem = async (e) => {
    e.preventDefault();

    const urlRegex = /^https?:\/\/.+/i;
    const droppedData = e.dataTransfer.getData("URL");

    let imageUrl;
    if (droppedData.includes("imgurl=")) {
      const params = new URLSearchParams(droppedData);
      imageUrl = params.get("imgurl");
    } else {
      imageUrl = droppedData;
    }

    setHovering(false);

    return (
      urlRegex.test(imageUrl) && (await checkImageUrl(imageUrl)) && imageUrl
    );
  };

  // check if dropped item is an image
  const checkImageUrl = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  };

  // update image box message
  const showInvalidImageMsg = () => {
    setEmptyImageBoxText("Invalid image format");
    setIsShaking(true);

    setTimeout(() => {
      setEmptyImageBoxText("Drag and drop an image URL");
      setIsShaking(false);
    }, 1500);
  };

  // manage the shake animation
  useEffect(() => {
    if (isShaking) {
      const timer = setTimeout(() => {
        setIsShaking(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isShaking]);

  // handle resetting
  const cancelHovering = () => {
    setHovering(false);
  };

  return {
    hovering,
    isShaking,
    emtpyImageBoxText,
    isMobile,
    handleDragOver,
    handleDragLeave,
    checkDroppedItem,
    showInvalidImageMsg,
    cancelHovering,
  };
};

export default useDragAndDrop;
