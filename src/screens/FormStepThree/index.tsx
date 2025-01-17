import { useRef } from "react";
import { Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useForm } from "react-hook-form";
import { useAccountForm } from "../../hooks/useAccountForm";
import { AccountProps } from "../../context/AccountFormContext";

import { styles } from "./styles";

import { Progress } from "../components/Progress";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function FormStepThree(){
    const { navigate } = useNavigation();
    const { updateFormData } = useAccountForm();
    const {control, handleSubmit, formState: { errors }, getValues } = useForm<AccountProps>();

    function handleNextStep(data: AccountProps){
        updateFormData(data);
        navigate("finish");
    }

    function validationPasswordConfimation( passwordConfirmation: string ) {
       
        const { password } = getValues();

        return password === passwordConfirmation || "As Senhas devem ser iguais."
    
    }

    const passwordConfirmationRef = useRef<TextInput>(null)

    return(
        <View style={styles.container}>
            <Text style={styles.title}>
                Escolha sua Senha 
            </Text>

            <Input
             icon="lock"
             error={errors.password?.message}
             formProps={{
                 control,
                name: "password",
                rules: {
                    required: "Senha é obrigatória.",
                    pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message: "Senha deve ter no minino 8 digitos"
                    }                    
                }
             }}
             inputProps={{
                placeholder: "Senha:",
                onSubmitEditing: () => passwordConfirmationRef.current?.focus(),
                returnKeyType: "next",
                secureTextEntry: true
            }}
            />

            <Input
            error={errors.passwordConfirmation?.message}
            ref={passwordConfirmationRef}
             icon="lock"
             formProps={{
                 control,
                name: "passwordConfimation",
                rules: {
                    required: "Confirme a senha.",
                    validate: validationPasswordConfimation
                }
             }}
             inputProps={{
                placeholder: "Confirme a senha",
                onSubmitEditing: handleSubmit(handleNextStep),
                secureTextEntry: true
            }}
            />
            <Button title="Continuar"onPress={handleSubmit(handleNextStep)}/>
            <Progress progress={90}/>
        </View>
    )
}