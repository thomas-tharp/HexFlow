﻿//HF Namespace
window.HF = window.HF || {};

HF.vector = function(direction, magnitude)
{
    var debug = HF.config.debug === true;

    if (debug)
    {
        if (magnitude != undefined && isNaN(magnitude))
        {
            console.error('HF.vector - invalid argument - returning null');
            return null;
        }
    }
    
    this.direction = direction || new HF.hexPoint();
    this.magnitude = magnitude || 0;    
};

HF.vector.prototype = {
    add: function (otherVector)
    {
        if (HF.config.debug)
        {
            if (otherVector == undefined)
            {
                console.error('HF.vector.add - invalid argument - returning null');
                return null;
            }
        }

        var thisPath = this.direction.scale(this.magnitude);
        var otherPath = otherVector.direction.scale(otherVector.magnitude);

        var combinedPath = thisPath.add(otherPath);

        var newMagnitude = combinedPath.length();

        if (newMagnitude < 0.01)
            return new HF.vector();

        var newDirection = combinedPath.toUnit();

        return new HF.vector(newDirection, newMagnitude);
    },

    scale: function (scalar)
    {
        return new HF.vector(this.direction, this.magnitude * scalar);
    },

    //This method disperses this vectors magnitude in each face direction, and returns a list of the resultant dispersed vectors
    //The total magnitude of the dispersed vectors will (approximately) equal the magnitude of this vector
    disperse: function ()
    {
        if (this.dispersions == undefined)
        {
            if (this.magnitude === 0)
                return [];

            var primaryFace = this.findFirstFace();
            var primaryAffinity = 1 - this.direction.subtract(primaryFace).length();

            var secondaryFace = this.findSecondFace();
            var secondaryAffinity = 1 - this.direction.subtract(secondaryFace).length();

            var forward = 1;
            var frontSides = forward * HF.config.flowDispersionConstant;
            var backSides = frontSides * HF.config.flowDispersionConstant;
            var back = backSides * HF.config.flowDispersionConstant;

            var totalDispersion = forward + (2 * frontSides) + (2 * backSides) + back;

            forward = forward / totalDispersion;
            frontSides = frontSides / totalDispersion;
            backSides = backSides / totalDispersion;
            back = back / totalDispersion;


            var indexOfPrimary;
            var indexOfSecondary;
            var numFaces = HF.directions.faceDirections.length;

            for (var i = 0; i < numFaces; i++)
            {
                var face = HF.directions.faceDirections[i];
                if (primaryFace.equals(face))
                    indexOfPrimary = i;
                if (secondaryFace.equals(face))
                    indexOfSecondary = i;
            }

            var dispersedVectors = [];

            for (i = 0; i < numFaces; i++)
            {
                var distanceFromPrimary = Math.min(Math.abs(i - indexOfPrimary), Math.abs(6 - Math.abs(i - indexOfPrimary)));
                var distanceFromSecondary = Math.min(Math.abs(i - indexOfSecondary), Math.abs(6 - Math.abs(i - indexOfSecondary)));

                var primaryResult;
                if (distanceFromPrimary == 0)
                    primaryResult = forward;
                else if (distanceFromPrimary == 1)
                    primaryResult = frontSides;
                else if (distanceFromPrimary == 2)
                    primaryResult = backSides;
                else
                    primaryResult = back;

                primaryResult = primaryResult * primaryAffinity;

                var secondaryResult;
                if (distanceFromSecondary == 0)
                    secondaryResult = forward;
                else if (distanceFromSecondary == 1)
                    secondaryResult = frontSides;
                else if (distanceFromSecondary == 2)
                    secondaryResult = backSides;
                else
                    secondaryResult = back;

                secondaryResult = secondaryResult * secondaryAffinity;

                var combinedResult = (primaryResult + secondaryResult) * this.magnitude;

                dispersedVectors.push(new HF.vector(HF.directions.faceByIndex(i), combinedResult));
            }
            this.dispersions = dispersedVectors;
        }

        return this.dispersions;
    },

    findFirstFace: function ()
    {
        if (this.direction.q == 1)
        {
            if (this.direction.r > this.direction.s)
                return HF.directions.face('ur');
            else
                return HF.directions.face('r');
        }
        if (this.direction.r == 1)
        {
            if (this.direction.s > this.direction.q)
                return HF.directions.face('l');
            else
                return HF.directions.face('ul');
        }
        if (this.direction.s == 1)
        {
            if (this.direction.q > this.direction.r)
                return HF.directions.face('lr');
            else
                return HF.directions.face('ll');
        }
        if (this.direction.q == -1)
        {
            if (this.direction.r > this.direction.s)
                return HF.directions.face('ll');
            else
                return HF.directions.face('l');
        }
        if (this.direction.r == -1)
        {
            if (this.direction.s > this.direction.q)
                return HF.directions.face('r');
            else
                return HF.directions.face('lr');
        }
        if (this.direction.s == -1)
        {
            if (this.direction.q > this.direction.r)
                return HF.directions.face('ur');
            else
                return HF.directions.face('ul');
        }
    },

    findSecondFace: function ()
    {
        if (this.direction.q == 1)
        {
            if (this.direction.r > this.direction.s)
                return HF.directions.face('r');
            else
                return HF.directions.face('ur');
        }
        if (this.direction.r == 1)
        {
            if (this.direction.s > this.direction.q)
                return HF.directions.face('ul');
            else
                return HF.directions.face('l');
        }
        if (this.direction.s == 1)
        {
            if (this.direction.q > this.direction.r)
                return HF.directions.face('ll');
            else
                return HF.directions.face('lr');
        }
        if (this.direction.q == -1)
        {
            if (this.direction.r > this.direction.s)
                return HF.directions.face('l');
            else
                return HF.directions.face('ll');
        }
        if (this.direction.r == -1)
        {
            if (this.direction.s > this.direction.q)
                return HF.directions.face('lr');
            else
                return HF.directions.face('r');
        }
        if (this.direction.s == -1)
        {
            if (this.direction.q > this.direction.r)
                return HF.directions.face('ul');
            else
                return HF.directions.face('ur');
        }
    }
};