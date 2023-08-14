import Image from 'next/image';

interface AIChatBubbleProps {
  message: string | React.ReactNode;
  hideAvatar?: boolean;
}

export const AIChatBubble = ({ message, hideAvatar }: AIChatBubbleProps) => {
  return (
    <div className="flex max-w-[480px] items-center">
      {!hideAvatar && (
        <div className="mr-4 flex flex-none flex-col items-center space-y-1">
          <Image src="/images/vertex-ai.png" alt="" width={32} height={32} />
          <p className="block text-xs text-gray-600">Vertex AI</p>
        </div>
      )}
      <div
        className={`relative flex-1 rounded-lg bg-gray-100 px-3 py-2 text-lg ${
          hideAvatar ? 'ml-[60px]' : ''
        }`}
      >
        <div className="text-gray-800">{message}</div>

        {!hideAvatar && (
          <div className="absolute left-0 top-1/2 h-3 w-3 -translate-x-1/2 rotate-45 transform bg-gray-100"></div>
        )}
      </div>
    </div>
  );
};
