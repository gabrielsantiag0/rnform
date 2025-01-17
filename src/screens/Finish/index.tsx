import { Text, View } from "react-native";
import { useAccountForm } from "../../hooks/useAccountForm"

export function Finish(){
    const { accountFormData } = useAccountForm();
    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>
                Nome: {accountFormData.name}
            </Text>
            <Text>
                E-Mail: {accountFormData.email}
            </Text>
            <Text>
                Data de nascimento: {accountFormData.birth}
            </Text>
            <Text>
                Telefone: (+55) {accountFormData.phone}
            </Text>
            <Text>
                Senha: {accountFormData.password} / {accountFormData.passwordConfirmation}
            </Text>

        </View>
    )
}