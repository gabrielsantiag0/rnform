import { useRef } from "react";
import { useForm } from "react-hook-form";
import { Text, TextInput, View } from "react-native";

import { styles } from "./styles";

import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function FormStepThree(){
    const {control, handleSubmit, formState: { errors }, getValues } = useForm();

    function handleNextStep(data: any){
        console.log(data);
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
            error={errors.passwordConfimation?.message}
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
        </View>
    )
}