const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

const TOKEN = 'ضع_هنا_التوكن_الخاص_ببوتك';
const CLIENT_ID = 'ضع_هنا_الايدي_الخاص_ببوتك';

const commands = [
    new SlashCommandBuilder()
        .setName('inhouse')
        .setDescription('إنشاء مباراة 5v5 جديدة وإدارة المراكز والشخصيات')
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
    try {
        console.log('جاري تسجيل أوامر البوت (Slash Commands)...');
        await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
        console.log('تم تسجيل الأوامر بنجاح!');
    } catch (error) {
        console.error(error);
    }
})();

client.once('ready', () => {
    console.log(`البوت أونلاين وجاهز باسم: ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'inhouse') {
        const embed = new EmbedBuilder()
            .setTitle('⚽ نظام الـ Inhouse (5v5) - Middle East')
            .setDescription('اختر فريقك والممركز الخاص بك (مثل Isagi أو Nagi):')
            .setColor('#0099ff');

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('join_home')
                    .setLabel('الهجوم (Home)')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('join_away')
                    .setLabel('الدفاع (Away)')
                    .setStyle(ButtonStyle.Danger),
            );

        await interaction.reply({ embeds: [embed], components: [row] });
    }
});

client.login(TOKEN);
