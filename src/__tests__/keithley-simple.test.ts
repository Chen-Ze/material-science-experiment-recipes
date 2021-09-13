import * as smuRecipe from '../keithley-simple/smu-recipe';
import * as keithley2600 from '../keithley-2636-simple-recipe';

test('Keithley 2636 Simple', () => {
    expect(
        smuRecipe.isOffChannelRecipe(keithley2600.defaultKeithley2636SimpleRecipe().smuARecipe) &&
            smuRecipe.isOffChannelRecipe(keithley2600.defaultKeithley2636SimpleRecipe().smuBRecipe),
    ).toBe(true);
});
