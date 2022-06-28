import { CommandDefinition } from '../CommandDefinition';
import { Category } from '../constants';
import { editMessage } from '../messages/edits/editMessage';

export const edit: CommandDefinition = {
  name: "edit",
  description: "Edit a message in a Discord channel",
  category: Category.ADMIN,
  executor: async (msg, bot) => {
    await editMessage(bot!, msg, msg.content.substring(6, msg.content.length));
  }
};