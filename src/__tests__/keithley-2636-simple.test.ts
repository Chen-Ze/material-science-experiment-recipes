import * as Keithley2636Simple from '../keithley-2636-simple-recipe';

test('Keithley 2636 Simple', () => {
    expect(
        Keithley2636Simple.isOffChannelRecipe(Keithley2636Simple.defaultKeithley2636SimpleRecipe().smuARecipe) &&
        Keithley2636Simple.isOffChannelRecipe(Keithley2636Simple.defaultKeithley2636SimpleRecipe().smuBRecipe) 
    ).toBe(true);
});
