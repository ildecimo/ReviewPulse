import Image from 'next/image';

interface AIChatBubbleProps {
  message: string | React.ReactNode;
  hideAvatar?: boolean;
}

export const AIChatBubble = ({ message, hideAvatar }: AIChatBubbleProps) => {
  return (
    <div className="mb-4 flex max-w-[450px] items-center">
      {!hideAvatar && (
        <div className="mr-4 flex flex-none flex-col items-center space-y-1">
          <Image
            src="/images/vertex-ai.jpeg"
            alt="AI Avatar"
            width={32}
            height={32}
            className="rounded-full"
          />
          <p className="block text-xs">Vertex AI</p>
        </div>
      )}
      <div
        className={`relative mb-2 flex-1 rounded-lg bg-gray-100/80 p-2 text-lg ${
          hideAvatar ? 'ml-[60px]' : ''
        }`}
      >
        <div>{message}</div>

        {!hideAvatar && (
          <div className="absolute left-0 top-1/2 h-2 w-2 -translate-x-1/2 rotate-45 transform bg-gray-100/80"></div>
        )}
      </div>
    </div>
  );
};
