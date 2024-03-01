// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { ActionIcon, TextInput } from '@mantine/core';

import {
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon
} from 'react-share';
import { FaLink } from 'react-icons/fa6';
import { notifications } from '@mantine/notifications';

export default function ShareModal({ url = '', title }: { url?: string; title?: string }) {
  return (
    <div>
      {url !== '' && (
        <TextInput
          mb="md"
          rightSection={
            <ActionIcon
              size={32}
              radius="xl"
              variant="filled"
              onClick={() => {
                navigator.clipboard.writeText(url);
                notifications.show({
                  title: 'Berhasil',
                  message: 'Link berhasil disalin'
                });
              }}>
              <span className="bg-blue-500 p-1 rounded-full">
                <FaLink />
              </span>
            </ActionIcon>
          }
          value={url}
          readOnly
        />
      )}
      <div className="flex gap-2">
        <FacebookShareButton url={url} title={title}>
          <FacebookIcon size={48} round />
        </FacebookShareButton>
        <TwitterShareButton url={url} title={title}>
          <XIcon size={48} round />
        </TwitterShareButton>
        <WhatsappShareButton url={url} title={title}>
          <WhatsappIcon size={48} round />
        </WhatsappShareButton>
        <TelegramShareButton url={url} title={title}>
          <TelegramIcon size={48} round />
        </TelegramShareButton>
      </div>
    </div>
  );
}
