// eslint-disable-file no-process-env
import { Client, Intents, Interaction } from 'discord.js';
import { Routes } from 'discord-api-types/v9';
import { REST } from '@discordjs/rest';
import { SlashCommandBuilder } from '@discordjs/builders';

require('dotenv').config();

const commands = [
  new SlashCommandBuilder().setName('ping').setDescription('Replys with Pong!'),
  new SlashCommandBuilder()
    .setName('hello')
    .setDescription('Replys with Hello World!')
].map((command) => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN ?? '');

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    // @ts-ignore
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: commands
    });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.on('interactionCreate', async (interaction: Interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
  if (interaction.commandName === 'hello') {
    await interaction.reply('Hello World!');
  }
});

client.login(process.env.TOKEN);
