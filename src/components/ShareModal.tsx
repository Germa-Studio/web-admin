// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { ActionIcon, TextInput } from '@mantine/core';

import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LineIcon,
  LineShareButton,
  LinkedinIcon,
  LinkedinShareButton,
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
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TwitterShareButton url={url} title={title}>
          <XIcon size={32} round />
        </TwitterShareButton>
        <WhatsappShareButton url={url} title={title}>
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
        <TelegramShareButton url={url} title={title}>
          <TelegramIcon size={32} round />
        </TelegramShareButton>
        <LineShareButton url={url} title={title}>
          <LineIcon size={32} round />
        </LineShareButton>
        <LinkedinShareButton url={url} title={title}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
        <EmailShareButton url={url} title={title}>
          <EmailIcon size={32} round />
        </EmailShareButton>
      </div>
    </div>
  );
}
