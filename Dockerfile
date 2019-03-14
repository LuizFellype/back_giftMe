FROM node:10.12-alpine

ADD . /app/gift-me

WORKDIR /app/gift-me

RUN  yarn install --dev

ENTRYPOINT [ "./entrypoint.sh" ]

CMD [ "yarn", "start" ]
