We need to finish adding time offset and duration to all animations. 
We also need to make a Timeline that implements IAnimation. What this would do is allow you to add and remove animations from a timeline. 
And by modifying the offset and the duration it would allow you adjust where animations are start and end.
We need to refactor the ExtendedAnimation and remove the SlopeAnimationBuilder.