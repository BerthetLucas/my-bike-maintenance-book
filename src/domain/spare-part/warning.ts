export const Message = {
  REPLACE_CHAIN: 'Remplacer la chaîne',
  REPLACE_TIRE: 'Remplacer le pneu',
  CHECK_CHAIN: 'Vérifier la chaîne',
  REPLACE_BRAKE: 'Changer les plaquettes de frein',
  CHECK_BRAKE: 'Veuillez vérifier les freins',
  SOFT_CHECK_BRAKE: 'Surveiller l’usure des plaquettes de frein',
} as const;

type MessageType = (typeof Message)[keyof typeof Message];

interface WarningConstructorParam {
  message: MessageType;
}

export class Warning {
  message: MessageType;

  constructor({ message }: WarningConstructorParam) {
    this.message = message;
  }

  static of(message: MessageType) {
    return new Warning({ message });
  }
}
