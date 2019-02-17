FROM node:10.12-alpine

ADD . /app/project-name

WORKDIR /app/project-name

RUN  yarn install --dev

ENTRYPOINT [ "./entrypoint.sh" ]

CMD [ "yarn", "start" ]
